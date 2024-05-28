const request = require('supertest');
const app = require('../src/index'); 
const Itinerary = require('../models/Itinerary');

// Mock the verifyUserLogIn function
jest.mock('../src/verifyUserLogIn', () => jest.fn());

describe('DELETE /api/deleteActivity', () => {
    it('should delete the specified activity from the itinerary', async () => {
        verifyUserLogIn.mockResolvedValue({});

        const mockItinerary = {
            activities: ['activity1', 'activity2', 'activity3']
        };
        Itinerary.findById.mockResolvedValue(mockItinerary);

        const response = await request(app)
            .delete('/api/deleteActivity')
            .send({
                token: 'mockToken',
                id: 'mockItineraryId',
                activity: 'activity2'
            });

        expect(response.status).toBe(200);
        expect(response.body.activities).toEqual(['activity1', 'activity3']);
    });

    it('should return 404 if the activity is not found in the itinerary', async () => {
        verifyUserLogIn.mockResolvedValue({});

        const mockItinerary = {
            activities: ['activity1', 'activity3']
        };
        Itinerary.findById.mockResolvedValue(mockItinerary);

        const response = await request(app)
            .delete('/api/deleteActivity')
            .send({
                token: 'mockToken',
                id: 'mockItineraryId',
                activity: 'activity2'
            });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Item not found in the itinerary');
    });
});
