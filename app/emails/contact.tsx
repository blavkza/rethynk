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

interface EmailTemplateProps {
  name: string;
  message: string;
  service: string;
}

export default function Contact({
  name,
  message,
  service,
}: EmailTemplateProps) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>RE:THYNKWeb Studios - Thank you for contacting us</Preview>
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
              Hello {name}!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              {message}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We've received your inquiry about <strong>{service}</strong>. Our
              team will review your request and get back to you within 24 hours
              with a detailed response.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`${baseUrl}/contact`}
              >
                View Your Request
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              In the meantime, you might be interested in:
            </Text>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-black text-[14px] leading-[24px]">
                <a
                  href={`${baseUrl}/work`}
                  className="text-blue-600 no-underline"
                >
                  Exploring our portfolio
                </a>
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                <a
                  href={`${baseUrl}/service`}
                  className="text-blue-600 no-underline"
                >
                  Learning more about our services
                </a>
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                <a
                  href={`${baseUrl}/about`}
                  className="text-blue-600 no-underline"
                >
                  Getting to know our team
                </a>
              </li>
            </ul>
            <Text className="text-black text-[14px] leading-[24px]">
              If you have any immediate questions, feel free to:
            </Text>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-black text-[14px] leading-[24px]">
                Call us at (555) 000-0000
              </li>
              <li className="text-black text-[14px] leading-[24px]">
                Email us directly at support@rethinkweb.com
              </li>
            </ul>
            <Text className="text-black text-[14px] leading-[24px]">
              We're looking forward to discussing how we can help bring your
              vision to life!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Best regards,
              <br />
              The RE:THYNKWeb Studios Team
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was sent to you because you contacted RE:THYNKWeb
              Studios. If you didn't request this email, you can safely ignore
              it.
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
