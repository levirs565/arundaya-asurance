-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_subscriptionClass_fkey` FOREIGN KEY (`subscriptionClass`) REFERENCES `ClassData`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
