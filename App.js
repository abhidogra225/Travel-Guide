import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Grid,

  Snackbar,
  Alert,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

const App = () => {
  const [itineraries, setItineraries] = useState([]);
  const [newItinerary, setNewItinerary] = useState({ name: '', destinations: '', date: '' });
  const [editItinerary, setEditItinerary] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/itineraries');
      setItineraries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Create a new itinerary and display a success message
  const handleCreate = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/itineraries', newItinerary);
      // Add the new itinerary to the current list of itineraries
      setItineraries([...itineraries, res.data]);
      // Show success message
      setSuccessMessage('Itinerary successfully added to the database!');
      setOpenSnackbar(true);
      // Reset input fields
      setNewItinerary({ name: '', destinations: '', date: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/itineraries/${id}`);
      setItineraries(itineraries.filter((itinerary) => itinerary._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updated = await axios.put(`http://localhost:5001/api/itineraries/${id}`, editItinerary);
      setItineraries(
        itineraries.map((itinerary) =>
          itinerary._id === id ? updated.data : itinerary
        )
      );
      setEditItinerary(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Interactive Travel Guide
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Plan Your Itinerary
        </Typography>

        <Card sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add a New Itinerary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Name"
                value={newItinerary.name}
                onChange={(e) => setNewItinerary({ ...newItinerary, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Destinations (comma-separated)"
                value={newItinerary.destinations}
                onChange={(e) =>
                  setNewItinerary({ ...newItinerary, destinations: e.target.value.split(',') })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newItinerary.date}
                onChange={(e) => setNewItinerary({ ...newItinerary, date: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleCreate}
            sx={{ marginTop: 2 }}
          >
            Create Itinerary
          </Button>
        </Card>

        {/* Display itineraries */}
        <Grid container spacing={3}>
          {itineraries.map((itinerary) => (
            <Grid item xs={12} sm={6} key={itinerary._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{itinerary.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Destinations: {itinerary.destinations.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {itinerary.date}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(itinerary._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => setEditItinerary(itinerary)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Edit itinerary */}
        {editItinerary && (
          <Card sx={{ padding: 3, marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>
              Edit Itinerary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Name"
                  value={editItinerary.name}
                  onChange={(e) => setEditItinerary({ ...editItinerary, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Destinations (comma-separated)"
                  value={editItinerary.destinations}
                  onChange={(e) =>
                    setEditItinerary({
                      ...editItinerary,
                      destinations: e.target.value.split(','),
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={editItinerary.date}
                  onChange={(e) => setEditItinerary({ ...editItinerary, date: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={() => handleUpdate(editItinerary._id)}
              sx={{ marginTop: 2 }}
            >
              Update Itinerary
            </Button>
          </Card>
        )}

        {/* Snackbar for success message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default App;
