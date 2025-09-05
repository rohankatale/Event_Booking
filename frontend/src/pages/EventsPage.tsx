// Events Page Component
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, Modal, LoadingSpinner } from '../components/common';
import { eventService, Event } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Background3D } from '../components/3d/Background3D';

export const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [registering, setRegistering] = useState<number | null>(null);

  // Create Event Form
  const [createForm, setCreateForm] = useState({
    Name: '',
    Description: '',
    Location: '',
    DateTime: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = events.filter(event =>
        event.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.Location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    try {
      const eventsData = await eventService.getAllEvents();
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const searchResults = await eventService.searchEvents(searchTerm);
      setFilteredEvents(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await eventService.createEvent(createForm);
      setShowCreateModal(false);
      setCreateForm({ Name: '', Description: '', Location: '', DateTime: '' });
      fetchEvents();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleRegister = async (eventId: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setRegistering(eventId);
    try {
      await eventService.registerForEvent(eventId);
      // Show success message
    } catch (error) {
      console.error('Registration failed:', error);
    }
    setRegistering(null);
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
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {event.Name}
            </h3>
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

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="glass"
              size="sm"
              onClick={() => {
                setSelectedEvent(event);
                setShowEventModal(true);
              }}
              className="flex-1"
            >
              View Details
            </Button>
            {isAuthenticated && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleRegister(event.ID)}
                loading={registering === event.ID}
                className="flex-1"
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

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
            Discover <span className="gradient-text">Amazing Events</span>
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            Find events that match your interests and connect with like-minded people.
          </p>

          {/* Search and Create */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="flex-1 w-full">
              <Input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                variant="glass"
              />
            </div>
            <Button
              variant="secondary"
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
            >
              Search
            </Button>
            {isAuthenticated && (
              <Button
                variant="primary"
                onClick={() => setShowCreateModal(true)}
                className="neon-glow"
              >
                Create Event
              </Button>
            )}
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
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
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
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      No events found
                    </h3>
                    <p className="text-white/60 mb-6">
                      {searchTerm 
                        ? 'Try adjusting your search terms' 
                        : 'Be the first to create an event!'
                      }
                    </p>
                    {isAuthenticated && (
                      <Button
                        variant="primary"
                        onClick={() => setShowCreateModal(true)}
                      >
                        Create First Event
                      </Button>
                    )}
                  </Card>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Floating Action Button for Mobile */}
        {isAuthenticated && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCreateModal(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg neon-glow md:hidden"
          >
            +
          </motion.button>
        )}
      </div>

      {/* Create Event Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Event"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <Input
            label="Event Name"
            value={createForm.Name}
            onChange={(e) => setCreateForm(prev => ({ ...prev, Name: e.target.value }))}
            placeholder="Enter event name"
            variant="glass"
            required
          />
          <Input
            label="Description"
            value={createForm.Description}
            onChange={(e) => setCreateForm(prev => ({ ...prev, Description: e.target.value }))}
            placeholder="Describe your event"
            variant="glass"
            required
          />
          <Input
            label="Location"
            value={createForm.Location}
            onChange={(e) => setCreateForm(prev => ({ ...prev, Location: e.target.value }))}
            placeholder="Event location"
            variant="glass"
            required
          />
          <Input
            type="datetime-local"
            label="Date & Time"
            value={createForm.DateTime}
            onChange={(e) => setCreateForm(prev => ({ ...prev, DateTime: e.target.value }))}
            variant="glass"
            required
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="glass"
              onClick={() => setShowCreateModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Create Event
            </Button>
          </div>
        </form>
      </Modal>

      {/* Event Details Modal */}
      <Modal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        title="Event Details"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {selectedEvent.Name}
              </h3>
              <p className="text-white/70 text-sm mb-2">
                📍 {selectedEvent.Location}
              </p>
              <p className="text-white/60 text-sm mb-4">
                🗓️ {formatDate(selectedEvent.DateTime)}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Description</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {selectedEvent.Description}
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="glass"
                onClick={() => setShowEventModal(false)}
                className="flex-1"
              >
                Close
              </Button>
              {isAuthenticated && (
                <Button
                  variant="primary"
                  onClick={() => handleRegister(selectedEvent.ID)}
                  loading={registering === selectedEvent.ID}
                  className="flex-1"
                >
                  Register
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};