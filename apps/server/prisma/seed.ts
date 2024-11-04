import { PrismaClient, UserClass } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.classData.createMany({
        data: [{
            name: UserClass.A, premiAmount: 300000
        }, {
            name: UserClass.B, premiAmount: 200000
        }, {
            name: UserClass.C, premiAmount: 100000
        }]
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
})