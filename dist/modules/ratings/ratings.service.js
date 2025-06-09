"use strict";
// import { prisma } from "../../config/db.config";
// export class RatingsService {
//     static async ratePlace(userId: string, placeId: string, value: number) {
//         return prisma.rating.upsert({
//             where: {
//                 userId_placeId: { userId, placeId }, // assumes @@unique([userId, placeId])
//             },
//             update: { value },
//             create: { userId, placeId, value },
//         });
//     }
//     static async getRatingsForPlace(placeId: string) {
//         return prisma.rating.findMany({
//             where: { placeId },
//             include: { user: true },
//         });
//     }
//     static async getUserRatingForPlace(userId: string, placeId: string) {
//         return prisma.rating.findUnique({
//             where: {
//                 userId_placeId: { userId, placeId },
//             },
//         });
//     }
//     static async getAverageRating(placeId: string) {
//         const result = await prisma.rating.aggregate({
//             where: { placeId },
//             _avg: { value: true },
//         });
//         return result._avg.value ?? 0;
//     }
// }
