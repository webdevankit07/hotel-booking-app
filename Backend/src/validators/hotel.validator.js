import { z } from 'zod';

export const hotelSChema = z.object({
    name: z.string({ required_error: 'hotel name is required' }),
    city: z.string({ required_error: 'city name is required' }),
    country: z.string({ required_error: 'country name is required' }),
    description: z.string({ required_error: 'hotel description is required' }),
    type: z.string({ required_error: 'hotel type is required' }),
    adultCount: z.optional(z.string({ required_error: 'adultCount is required' })),
    childCount: z.optional(z.string({ required_error: 'childCount is required' })),
    facilities: z.optional(z.string({ required_error: 'facilites is required' }).array()),
    pricePerNight: z.string({ required_error: 'pricePerNight is required' }),
    starRating: z.optional(z.string({ required_error: 'startRating is required' })),
    imageUrls: z.optional(z.string({ required_error: 'startRating is required' }).array()),
});
