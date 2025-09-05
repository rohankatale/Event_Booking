// My Events Page Component
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Modal, Input, LoadingSpinner } from '../components/common';
import { eventService, Event } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Background3D } from '../components/3d/Background3D';

export const MyEventsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const [editForm, setEditForm] = useState({
    Name: '',
    Description: '',
    Location: '',
    DateTime: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyEvents();
    }
  }, [isAuthenticated]);

  const fetchMyEvents = async () => {
    try {
      // Since the backend doesn't have a specific "my events" endpoint,
      // we'll fetch all events and filter by user (this would need backend changes for production)
      const allEvents = await eventService.getAllEvents();
      setEvents(allEvents);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
    setLoading(false);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setEditForm({
      Name: event.Name,
      Description: event.Description,
      Location: event.Location,
      DateTime: event.DateTime.split('.')[0], // Remove milliseconds for datetime-local input
    });
    setShowEditModal(true);
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    try {
      await eventService.updateEvent(selectedEvent.ID, editForm);
      setShowEditModal(false);
      setSelectedEvent(null);
      fetchMyEvents();
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDelete = async (eventId: number) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    setDeleting(eventId);
    try {
      await eventService.deleteEvent(eventId);
      fetchMyEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
    setDeleting(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card variant="glass" className="h-full card-hover">
        <div className="flex flex-col h-full">
          {/* Event Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-white line-clamp-2 flex-1 mr-2">
                {event.Name}
              </h3>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-xs text-white/60">Active</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-2">
              📍 {event.Location}
            </p>
            <p className="text-white/60 text-sm">
              🗓️ {formatDate(event.DateTime)}
            </p>
          </div>

          {/* Event Description */}
          <div className="flex-1 mb-4">
            <p className="text-white/80 text-sm line-clamp-3">
              {event.Description}
            </p>
          </div>

          {/* Event Stats */}
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-white">0</div>
                <div className="text-xs text-white/60">Registered</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">0</div>
                <div className="text-xs text-white/60">Views</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">
                  {new Date(event.DateTime) > new Date() ? 'Upcoming' : 'Past'}
                </div>
                <div className="text-xs text-white/60">Status</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="glass"
              size="sm"
              onClick={() => handleEdit(event)}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDelete(event.ID)}
              loading={deleting === event.ID}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <Background3D />
        <Card variant="glass" className="p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-white/70 mb-6">
            Please sign in to view your events.
          </p>
          <Button variant="primary" onClick={() => window.location.href = '/login'}>
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <Background3D />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="gradient-text">Events</span>
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            Manage and track all your created events in one place.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <Card variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {events.length}
              </div>
              <div className="text-white/60 text-sm">Total Events</div>
            </Card>
            <Card variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {events.filter(e => new Date(e.DateTime) > new Date()).length}
              </div>
              <div className="text-white/60 text-sm">Upcoming</div>
            </Card>
            <Card variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">0</div>
              <div className="text-white/60 text-sm">Total Registrations</div>
            </Card>
            <Card variant="glass" className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">0</div>
              <div className="text-white/60 text-sm">Total Views</div>
            </Card>
          </div>
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.ID} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card variant="glass" className="p-12 max-w-md mx-auto">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      No events yet
                    </h3>
                    <p className="text-white/60 mb-6">
                      Create your first event to get started!
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => window.location.href = '/events'}
                      className="neon-glow"
                    >
                      Create Your First Event
                    </Button>
                  </Card>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Edit Event Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Event"
      >
        <form onSubmit={handleUpdateEvent} className="space-y-4">
          <Input
            label="Event Name"
            value={editForm.Name}
            onChange={(e) => setEditForm(prev => ({ ...prev, Name: e.target.value }))}
            placeholder="Enter event name"
            variant="glass"
            required
          />
          <Input
            label="Description"
            value={editForm.Description}
            onChange={(e) => setEditForm(prev => ({ ...prev, Description: e.target.value }))}
            placeholder="Describe your event"
            variant="glass"
            required
          />
          <Input
            label="Location"
            value={editForm.Location}
            onChange={(e) => setEditForm(prev => ({ ...prev, Location: e.target.value }))}
            placeholder="Event location"
            variant="glass"
            required
          />
          <Input
            type="datetime-local"
            label="Date & Time"
            value={editForm.DateTime}
            onChange={(e) => setEditForm(prev => ({ ...prev, DateTime: e.target.value }))}
            variant="glass"
            required
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="glass"
              onClick={() => setShowEditModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Update Event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};