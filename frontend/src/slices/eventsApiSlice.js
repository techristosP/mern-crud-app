import { apiSlice } from './apiSlice';
const EVENTS_URL = '/api/events';

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createEvent: builder.mutation({
            query: (data) => ({
                url: `${EVENTS_URL}/create`,
                method: 'POST',
                body: data,
            }),
        }),
        updateEvent: builder.mutation({
            query: (data) => ({
                url: `${EVENTS_URL}/update`,
                method: 'PUT',
                body: data,
            }),
        }),
        getEvents: builder.mutation({
            query: () => ({
                url: `${EVENTS_URL}`,
                method: 'GET',
            }),
        }),
    })
})

export const { useCreateEventMutation, useUpdateEventMutation, useGetEventsMutation } = eventsApiSlice;