import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface MaintenanceConfirmationEmailProps {
  name: string;
  maintenanceId: string;
  plan: {
    name: string;
    price: string;
    frequency: string;
    features: string[];
  };
  website: string;
  startDate: string;
}

export default function MaintenanceConfirmationEmail({
  name,
  maintenanceId,
  plan,
  website,
  startDate,
}: MaintenanceConfirmationEmailProps) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>
        RE:THYNKWeb Studios - Website Maintenance Plan Confirmation
      </Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                width="170"
                height="50"
                alt="RE:THYNKWeb Studios"
                className="my-0 mx-auto"
              />
            </Section>
            <Text className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to Your Maintenance Plan, {name}!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for choosing RE:THYNKWeb Studios for your website
              maintenance needs. We're excited to help keep your website secure,
              up-to-date, and performing at its best.
            </Text>

            {/* Plan Details */}
            <Section className="bg-gray-50 rounded-lg p-6 my-6">
              <Text className="text-black text-[16px] font-bold m-0">
                Maintenance Plan Details
              </Text>
              <Text className="text-gray-500 text-[12px] mt-1 mb-4">
                Plan ID: {maintenanceId}
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-4" />
              <Text className="text-black text-[14px] font-bold">
                {plan.name}
              </Text>
              <Text className="text-blue-600 text-[16px] font-bold">
                {plan.price} / {plan.frequency}
              </Text>

              <Text className="text-black text-[14px] mt-4">
                <strong>Website:</strong> {website}
              </Text>
              <Text className="text-black text-[14px]">
                <strong>Start Date:</strong> {startDate}
              </Text>

              <Text className="text-black text-[14px] mt-4 mb-2 font-medium">
                Included Services:
              </Text>
              <ul className="list-none p-0 m-0">
                {plan.features.map((feature, index) => (
                  <Text
                    key={index}
                    className="text-gray-600 text-[14px] leading-[20px] my-1"
                  >
                    ✓ {feature}
                  </Text>
                ))}
              </ul>
            </Section>

            {/* Getting Started */}
            <Text className="text-black text-[16px] font-bold mb-4">
              Getting Started
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Here's what happens next:
            </Text>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-black text-[14px] leading-[24px]">
                Initial Website Audit (within 48 hours)
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Security Setup & Configuration
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Backup System Implementation
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Monitoring Tools Installation
              </li>
            </ul>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`${baseUrl}/dashboard/maintenance/${maintenanceId}`}
              >
                View Maintenance Dashboard
              </Button>
            </Section>

            {/* Support Information */}
            <Text className="text-black text-[16px] font-bold mb-4">
              Support & Resources
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              For your reference:
            </Text>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-black text-[14px] leading-[24px]">
                Support Hours: Monday-Friday, 9:00 AM - 5:00 PM EST
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Emergency Support: Available 24/7 for critical issues
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Response Time: Within{" "}
                {plan.name.includes("Enterprise")
                  ? "2"
                  : plan.name.includes("Professional")
                    ? "24"
                    : "48"}{" "}
                hours
              </li>
            </ul>

            <Text className="text-black text-[14px] leading-[24px]">
              Helpful Resources:
            </Text>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-black text-[14px] leading-[24px]">
                <a
                  href={`${baseUrl}/maintenance/guide`}
                  className="text-blue-600 no-underline"
                >
                  Maintenance Guide
                </a>
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                <a
                  href={`${baseUrl}/maintenance/faq`}
                  className="text-blue-600 no-underline"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                <a
                  href={`${baseUrl}/maintenance/best-practices`}
                  className="text-blue-600 no-underline"
                >
                  Website Maintenance Best Practices
                </a>
              </li>
            </ul>

            <Text className="text-black text-[14px] leading-[24px]">
              Need assistance?
            </Text>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-black text-[14px] leading-[24px]">
                Support Portal: support.rethinkweb.com
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Email: support@rethinkweb.com
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Phone: (555) 000-0000
              </li>
            </ul>

            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for trusting us with your website maintenance. We're
              committed to keeping your website running smoothly and securely.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Best regards,
              <br />
              The RE:THYNKWeb Studios Maintenance Team
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email confirms your website maintenance plan subscription.
              Please save this for your records.
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              RE:THYNKWeb Studios, 123 Web Street, Digital City, 12345
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
