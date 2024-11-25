import cron from "node-cron";
import { EmailService } from "../services/email.service";
import { FineModel } from "../../data/models/fine.model";
import { generateFineEmailTemplate } from "../templates/email.template";
import { envs } from "../../config/envs.plugin";

export const emailJob = () => {
  const emailService = new EmailService();

  cron.schedule("*/10 * * * * *", async () => {
    try {
      const pendingFines = await FineModel.find({ isEmailSent: false });
      if (!pendingFines.length) {
        console.log("no fines pending to send email found");
        return;
      }
      console.log(`Processing ${pendingFines.length} fines`);
      await Promise.all(
        pendingFines.map(async (fine) => {
          console.log(fine);
          try {
            await emailService.sendEmail({
              to: fine.email,
              subject: "New Fine",
              htmlBody: generateFineEmailTemplate(
                fine.plate,
                fine.city,
                fine.state,
                fine.speed,
                fine.limit,
                fine.lat,
                fine.lng,
                fine.creationDate
              ),
            });
            console.log(
              `email sent for fine with id ${fine._id}`
            );
            let updatedFine = {
              lat: fine.lat,
              lng: fine.lng,
              isEmailSent: true,
              email: fine.email,
              plate: fine.plate,
              city: fine.city,
              state: fine.state,
              speed: fine.speed,
              limit: fine.limit,
              creationDate: fine.creationDate
            };

            await FineModel.findByIdAndUpdate(fine._id, updatedFine);
            console.log(`fine with id: ${fine._id} updated`);
          } catch (error) {
            console.error("Error while proccessing fine");
          }
        })
      );
    } catch (error) {
      console.error(`Error while sending emails`);
    }
  });
}