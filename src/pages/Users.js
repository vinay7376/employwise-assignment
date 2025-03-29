import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card, CardContent, Typography, Button, TextField, Dialog, DialogTitle,
    DialogContent, DialogActions, Snackbar, Alert, Grid, CircularProgress, Container
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

const API_URL = "https://reqres.in/api/users";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({ first_name: "", last_name: "" });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [loading, setLoading] = useState(true);
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data.data);
        } catch (error) {
            setSnackbar({ open: true, message: "Error fetching users", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditedUser({ first_name: user.first_name, last_name: user.last_name });
        setAddMode(false);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setUsers(users.filter(user => user.id !== id));
            setSnackbar({ open: true, message: "User deleted successfully", severity: "success" });
        } catch (error) {
            setSnackbar({ open: true, message: "Error deleting user", severity: "error" });
        }
    };

    const handleSave = async () => {
        try {
            if (addMode) {
                const response = await axios.post(API_URL, editedUser);
                setUsers([...users, { ...response.data, id: users.length + 1 }]);
                setSnackbar({ open: true, message: "User added successfully", severity: "success" });
            } else {
                await axios.put(`${API_URL}/${selectedUser.id}`, editedUser);
                setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...editedUser } : user));
                setSnackbar({ open: true, message: "User updated successfully", severity: "success" });
            }
            setOpen(false);
        } catch (error) {
            setSnackbar({ open: true, message: "Error updating user", severity: "error" });
        }
    };

    return (
        <Container style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h3" gutterBottom style={{ fontWeight: "bold" }}>Employee Management</Typography>
            <Button variant="contained" color="primary" startIcon={<AddCircleOutline />} 
                style={{ marginBottom: "20px", padding: "10px 20px", fontSize: "16px" }}
                onClick={() => {
                    setEditedUser({ first_name: "", last_name: "" });
                    setAddMode(true);
                    setOpen(true);
                }}>
                Add Employee
            </Button>

            {loading ? <CircularProgress style={{ display: "block", margin: "20px auto" }} /> : (
                <Grid container spacing={3} justifyContent="center">
                    {users.map(user => (
                        <Grid item xs={12} sm={6} md={4} key={user.id}>
                            <Card sx={{ padding: 3, boxShadow: 5, borderRadius: 3, textAlign: "center" }}>
                                <CardContent>
                                    <img src={user.avatar} alt={user.first_name} style={{ width: "80px", borderRadius: "50%", marginBottom: "10px" }} />
                                    <Typography variant="h6" fontWeight="bold">{user.first_name} {user.last_name}</Typography>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user)} style={{ marginTop: "10px" }}>Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(user.id)} style={{ marginTop: "10px", marginLeft: "10px" }}>Delete</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{addMode ? "Add New Employee" : "Edit Employee"}</DialogTitle>
                <DialogContent>
                    <TextField label="First Name" value={editedUser.first_name} onChange={(e) => setEditedUser({ ...editedUser, first_name: e.target.value })} fullWidth margin="dense" />
                    <TextField label="Last Name" value={editedUser.last_name} onChange={(e) => setEditedUser({ ...editedUser, last_name: e.target.value })} fullWidth margin="dense" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>{addMode ? "Add" : "Save"}</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Container>
    );
};

export default Users;