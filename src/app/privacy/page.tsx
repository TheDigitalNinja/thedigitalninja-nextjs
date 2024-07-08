import Header from "../../components/Header";

export default function PrivacyPolicy() {
  return (
    <>
      <Header title="Privacy Policy" />
      <main className="container mx-auto py-8">
        <div className="prose dark:prose-invert mx-auto">
          <h1>Privacy Policy</h1>
          <p>Last updated: 7/7/2024</p>
          <h2>1. Introduction</h2>
          <p>Welcome to TheDigital.Ninja. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
          
          <h2>2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, such as when you create an account or use our services. This may include:</p>
          <ul>
            <li>Personal information (e.g., name, email address)</li>
            <li>Authentication data from third-party services (e.g., Google)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Communicate with you about our services</li>
            <li>Protect against, investigate, and prevent potentially unlawful or abusive activities</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. Please contact us to exercise these rights.</p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at dsw.ninjaboy@gmail.com .</p>
        </div>
      </main>
    </>
  );
}