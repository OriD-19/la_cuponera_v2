import { OfferState, PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    // seed the database

    //creating fake categories
    for (let i = 0; i < 5; i++) {
        await prisma.category.create({
            data: {
                name: faker.lorem.word(),
                description: faker.lorem.sentence(),
            }
        });
    }

    await prisma.enterprise.create({
        data: {
            user: {
                create: {
                    firstName: faker.company.name(),
                    email: faker.internet.email(),
                    password: "$2a$12$AwhGLAMrS3qXtufrTVt4SOOIRd1/X.PaUaytjHtjGUl2RrdPMcqDO", // micontrasenia
                }
            },
            enterpriseCode: "ABC123",
            description: faker.lorem.sentence(),
            commissionPercentage: faker.number.float({ fractionDigits: 2 }),
            location: faker.location.city(),
            phone: faker.phone.number(),

            Category: {
                connect: {
                    id: faker.number.int({ min: 1, max: 5 }),
                }
            }
        }
    });

    const offerStates: OfferState[] = ["PENDING", "ACTIVE", "EXPIRED", "REJECTED", "DISCARDED"];


    for (let i = 0; i < 50; i++) {
        await prisma.offer.create({
            data: {
                title: faker.lorem.words(3),
                description: faker.lorem.sentence(),
                originalPrice: faker.number.float({ fractionDigits: 2 }) * 50 + 50,
                discountPrice: faker.number.float({ fractionDigits: 2 }) * 50,
                validFrom: faker.date.recent(),
                validUntil: faker.date.future(),
                quantityLimit: faker.number.int({ min: 100, max: 300 }),
                enterpriseId: 1,
                offerState: offerStates[Math.floor(Math.random() * offerStates.length)],
            }
        });
    }

}