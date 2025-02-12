import { z } from "zod";

const BaseEventSchema = z.object({
  timestamp: z.string().datetime(),
  userId: z.string(),
});

const UserActivityVerseReadEventSchema = BaseEventSchema.extend({
  type: z.literal("user.activity.verse.read"),
  metadata: z.object({
    verse: z.number(),
    chapter: z.number(),
    book: z.number(),
  }),
});

const UserActivityPrayerRequestEventSchema = BaseEventSchema.extend({
  type: z.literal("user.activity.prayer.request"),
  metadata: z.object({
    prayerFor: z.string(), // ID or name of the person being prayed for
    prayerType: z.string(), // Type of prayer (e.g., healing, guidance, etc.)
    message: z.string(), // Optional message or description
  }),
});

/**
 * 
 * EventSchema can be used like this: 
 * const event = {
 * type: 'user.activity.prayer.request',
 * timestamp: '2025-02-10T13:10:30.123Z',
 * metadata: {
 *     prayerFor: '67890',
 *     prayerType: 'healing',
 *     message: 'Please pray for my friend’s health.',
 * },
 * userId: '12345',
 * };

    const parsedEvent = EventSchema.safeParse(event);

    if (parsedEvent.success) {
    console.log('Valid event:', parsedEvent.data);
    } else {
    console.error('Invalid event:', parsedEvent.error);
    }
 */
export const EventSchema = z.discriminatedUnion("type", [
  UserActivityVerseReadEventSchema,
  UserActivityPrayerRequestEventSchema,
]);

export type Event = z.infer<typeof EventSchema>;
