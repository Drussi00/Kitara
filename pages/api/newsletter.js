const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us10",
});

export default async (req, res) => {
  const { email } = req.body;
  if (!email || !email.length) {
    return res.status(400).json({
      error: "Forgot to add your email?",
    });
  }

  try {
    const run = async () => {
      const response = await mailchimp.lists.batchListMembers("fd99576834", {
        members: [{ email_address: email, status: "subscribed" }],
      });
      console.log(response);
    };
    run();
  } catch (error) {
    return res.status(400).json({
      error: `Oops, something went wrong... Send me an email at uriklar@gmail.com and I'll add you to the list.`,
    });

    // Report error to Sentry or whatever
  }
};
