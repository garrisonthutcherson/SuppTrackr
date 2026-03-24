export function PrivacyPolicyContent() {
  return (
    <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
      <h1 className="text-2xl font-bold text-on-surface mb-2">SuppTrackr Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> March 22, 2026<br />
        <strong>Last Updated:</strong> March 22, 2026
      </p>
      <p>
        SuppTrackr (“Company,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you access or use our mobile application, website, or related services (collectively, the “Service”).
      </p>
      <p>
        By using the Service, you consent to the practices described in this Privacy Policy. If you do not agree, do not use the Service. This Policy is incorporated into and subject to our Terms of Service (including the Medical and Health Disclaimer in Section 1 of the Terms).
      </p>

      <h2 className="text-lg font-bold text-on-surface mt-6">1. Information We Collect</h2>
      <p>We collect information you provide, information from third parties (via SSO), and automatically collected information. We minimize collection to what is necessary.</p>
      
      <p className="font-semibold text-on-surface mt-4">Information You Provide or Create:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Account information via Single Sign-On (SSO): name, email address, profile picture, and unique identifier from providers such as Google or Apple.</li>
        <li>User Content: supplement intake logs, schedules, dosages, timing, goals, notes, and any other data you enter (which may include sensitive health-related inferences, e.g., vitamin deficiencies or routines).</li>
      </ul>

      <p className="font-semibold text-on-surface mt-4">Automatically Collected Information:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Device and usage data: IP address, device ID, operating system, app version, interaction data, crash logs, and analytics.</li>
        <li>No precise geolocation is collected unless you explicitly enable it (we do not require it).</li>
      </ul>

      <p className="mt-4">
        <strong>Sensitive / Consumer Health Data Note:</strong> Your supplement tracking data may qualify as “sensitive personal information” or “consumer health data” under laws such as the California Consumer Privacy Act (CCPA/CPRA) or Washington My Health My Data Act. We treat it as such and process it only as necessary to provide the Service you requested.
      </p>

      <p className="font-semibold text-on-surface mt-4">We do not collect:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Biometric data, precise location, financial information, or government IDs unless voluntarily provided.</li>
        <li>Health records protected under HIPAA (see Section 9 below).</li>
      </ul>

      <h2 className="text-lg font-bold text-on-surface mt-6">2. How We Collect Information</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Directly from you when you create an account via SSO or enter data.</li>
        <li>From SSO providers (subject to their policies).</li>
        <li>Automatically through cookies, pixels, SDKs, and analytics tools (e.g., Firebase, Google Analytics for Firebase, or similar — all subject to their own policies).</li>
        <li>From service providers who assist in operating the Service.</li>
      </ul>

      <h2 className="text-lg font-bold text-on-surface mt-6">3. How We Use Your Information</h2>
      <p>We use information only to:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Provide, personalize, and optimize the Service (track intake, generate schedules, deliver general suggestions).</li>
        <li>Improve the Service, including through aggregated/anonymized analysis or model training (never with identifiable data).</li>
        <li>Communicate with you (account notices, updates).</li>
        <li>Ensure security, prevent fraud, and enforce our Terms.</li>
        <li>Comply with legal obligations.</li>
      </ul>
      <p>We do not use your data for targeted advertising or profiling that produces legal or significant effects.</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">4. How We Share or Disclose Information</h2>
      <p>We do not sell your personal information or consumer health data for monetary or other valuable consideration (as defined by CCPA or similar laws).</p>
      <p>We may disclose information in these limited cases:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Service Providers:</strong> Cloud hosting, analytics, SSO integration, and customer support providers — bound by strict contractual obligations.</li>
        <li><strong>SSO Providers:</strong> Google, Apple, etc., as required for login functionality.</li>
        <li><strong>Legal Requirements:</strong> To comply with law, court orders, or government requests.</li>
        <li><strong>Business Transfers:</strong> In mergers, acquisitions, or asset sales (with notice where required).</li>
        <li><strong>Aggregated/Anonymized Data:</strong> In non-identifiable form for research or analytics.</li>
      </ul>
      <p>We never share identifiable supplement logs or health inferences with advertisers or unrelated third parties.</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">5. Data Security</h2>
      <p>We implement commercially reasonable administrative, technical, and physical safeguards (encryption in transit and at rest, access controls, regular audits) designed to protect your information.</p>
      <p className="uppercase font-bold text-on-surface">HOWEVER, NO SECURITY MEASURES ARE ABSOLUTELY SECURE.</p>
      <p>We cannot guarantee that your data will never be accessed, disclosed, altered, or destroyed by breach or other means. You use the Service and provide data at your own risk. In the event of a breach, we will notify you and regulators as required by law.</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">6. Data Retention</h2>
      <p>We retain your information only as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce agreements. When you delete your account, we delete or anonymize your personal data within a reasonable time (except for backups or legal holds).</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">7. Your Privacy Rights and Choices</h2>
      <p className="font-semibold text-on-surface mt-4">All Users:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Access, correct, or delete your data via in-app settings or by contacting us.</li>
        <li>Opt out of certain processing (e.g., analytics) where possible.</li>
        <li>Withdraw consent for non-essential processing (may require account deletion).</li>
      </ul>

      <p className="font-semibold text-on-surface mt-4">California Residents (and Residents of Other States with Similar Rights):</p>
      <p>Under CCPA/CPRA and analogous state laws, you have the right to:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Know what personal information (including sensitive/health data) we collect, use, and disclose.</li>
        <li>Request deletion of your personal information.</li>
        <li>Opt out of any “sale” or “sharing” of personal information (we do neither).</li>
        <li>Limit use of sensitive personal information (we already limit to Service provision only).</li>
        <li>Non-discrimination for exercising rights.</li>
      </ul>
      <p>To exercise rights, email <a href="mailto:support@supptrackr.com" className="text-primary hover:underline">support@supptrackr.com</a> or use the in-app “Request Data” feature. We will verify your identity and respond within 45 days (extendable). You may use an authorized agent.</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">8. Children’s Privacy</h2>
      <p>The Service is not directed to children under 13 (or 16/18 under certain state laws). We do not knowingly collect data from children. If we learn we have collected such data, we will delete it immediately. Parents/guardians: contact us if you believe your child has provided information.</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">9. Important Health Data Disclaimers</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Not HIPAA-Protected:</strong> SuppTrackr is not a covered entity or business associate under HIPAA. Your supplement tracking data is not protected health information under HIPAA. The Medical and Health Disclaimer in our Terms of Service applies fully.</li>
        <li><strong>Consumer Health Data Laws:</strong> We comply with applicable state consumer health data laws (e.g., Washington My Health My Data Act) by limiting collection, use, and disclosure to what is strictly necessary for the Service and obtaining your affirmative use of the Service as consent.</li>
        <li>You are solely responsible for the accuracy of your supplement data and any health decisions. We do not verify or validate any information you enter.</li>
      </ul>

      <h2 className="text-lg font-bold text-on-surface mt-6">10. Third-Party Services and Links</h2>
      <p>SSO providers, app stores, and any linked supplement retailers operate under their own privacy policies. We are not responsible for their practices.</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">11. International Users</h2>
      <p>If you are outside the United States, your data is transferred to and processed in the United States. By using the Service, you consent to this transfer. We use standard contractual clauses or other safeguards where required.</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">12. Changes to This Privacy Policy</h2>
      <p>We may update this Policy. We will notify you of material changes via the Service or email and update the “Last Updated” date. Continued use constitutes acceptance.</p>

      <h2 className="text-lg font-bold text-on-surface mt-6">13. Contact Us</h2>
      <p>For questions, requests, or complaints:</p>
      <p>Email: <a href="mailto:support@supptrackr.com" className="text-primary hover:underline">support@supptrackr.com</a></p>
      <p>You may also contact your state attorney general or data protection authority.</p>

      <p className="font-bold mt-8">By using SuppTrackr, you acknowledge that you have read and understood this Privacy Policy, including the health data disclaimers and security limitations.</p>
    </div>
  );
}
