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

interface OrderConfirmationEmailProps {
  name: string;

  service: {
    name: string;
    plan: string;
    price: string;
    features: string[];
  };
  startDate: string;
}

export default function OrderConfirmationEmail({
  name,

  service,
  startDate,
}: OrderConfirmationEmailProps) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>RE:THYNKWeb Studios - Order Confirmation </Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px] flex justify-center ">
              <div className="justify-center flex flex-col">
                <span className="font-bold text-2xl text-black ">
                  RE:THYNK{" "}
                </span>
                <p className="pl-1  text-zinc-600">Web studio</p>
              </div>
            </Section>
            <Text className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Thank you for your order, {name}!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We're excited to confirm your order for {service.name} services.
              Here's a summary of your order:
            </Text>

            {/* Order Details */}
            <Section className="bg-gray-50 rounded-lg p-6 my-6">
              <Text className="text-black text-[16px] font-bold m-0">
                Order Details
              </Text>

              <Hr className="border border-solid border-[#eaeaea] my-4" />
              <Text className="text-black text-[14px] font-bold uppercase">
                {service.name} - {service.plan}
              </Text>
              <Text className="text-blue-600 text-[16px] font-bold">
                {service.price}
              </Text>
              <Text className="text-black text-[14px] font-bold">
                starting Period:
              </Text>
              <Text className="text-black text-[14px] font-bold">
                {startDate}
              </Text>
              <Text className="text-black text-[14px] mt-4 mb-2 font-medium">
                Included Features:
              </Text>
              <ul className="list-none p-0 m-0">
                {service.features.map((feature, index) => (
                  <Text
                    key={index}
                    className="text-gray-600 text-[14px] leading-[20px] my-1"
                  >
                    ✓ {feature}
                  </Text>
                ))}
              </ul>
            </Section>

            {/* Next Steps */}
            <Text className="text-black text-[16px] font-bold mb-4">
              Next Steps
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              1. Our team will reach out to you {startDate} to schedule an
              initial consultation.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              2. We'll review your requirements in detail and create a project
              timeline.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              3. Once approved, we'll begin working on your project immediately.
            </Text>

            {/* Payment Information */}
            <Text className="text-black text-[14px] leading-[24px]">
              Payment Information:
            </Text>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-black text-[14px] leading-[24px]">
                Initial invoice will be sent within 24 hours
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Payment is due within 7 days
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                We accept all major credit cards and bank transfers
              </li>
            </ul>

            <Text className="text-black text-[14px] leading-[24px]">
              Need immediate assistance?
            </Text>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-black text-[14px] leading-[24px]">
                Call us at (555) 000-0000
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Email us at support@rethinkweb.com
              </li>
            </ul>

            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for choosing RE:THYNKWeb Studios. We're looking forward
              to working with you!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Best regards,
              <br />
              The RE:THYNKWeb Studios Team
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This is an automated email confirming your order. Please do not
              reply to this email.
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
