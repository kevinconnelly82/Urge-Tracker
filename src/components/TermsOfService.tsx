export default function TermsOfService() {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-8">Last Updated: November 21, 2024</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Urge Tracker ("the App"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these Terms of Service, please do not 
              use the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              Urge Tracker is a personal tracking tool designed to help users identify patterns and triggers 
              in their urges through structured data collection and analytics. The App is provided as-is for 
              informational and self-monitoring purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Medical Disclaimer</h2>
            <p className="mb-3">
              <strong>IMPORTANT:</strong> Urge Tracker is NOT a medical device, treatment, or replacement for 
              professional healthcare. The App is a tracking tool only.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>This App does not provide medical advice, diagnosis, or treatment</li>
              <li>Always seek the advice of your physician or qualified health provider with any questions</li>
              <li>Never disregard professional medical advice or delay seeking it because of something you 
                  have read or tracked in this App</li>
              <li>If you are experiencing a medical emergency, call emergency services immediately</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Privacy and Data Collection</h2>
            <p className="mb-3">
              We take your privacy seriously. Our data practices include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Local Storage:</strong> Your personal entries, including notes, are stored locally 
                  on your device using IndexedDB. This data never leaves your device.</li>
              <li><strong>Anonymous Analytics:</strong> We collect anonymized, aggregate data (urge type, 
                  intensity, location, emotions, physical sensations, action taken, and timestamp) for 
                  research and service improvement purposes. This data contains NO personally identifiable 
                  information, user IDs, or personal notes.</li>
              <li><strong>No User Accounts:</strong> The App does not require user accounts or collect 
                  personal information such as names, email addresses, or contact details.</li>
              <li><strong>Data Control:</strong> You can delete all local data at any time by clearing your 
                  browser data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. User Responsibilities</h2>
            <p className="mb-3">By using this App, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the App for personal, non-commercial purposes only</li>
              <li>Provide accurate information when logging entries</li>
              <li>Not use the App as a substitute for professional medical care</li>
              <li>Not attempt to reverse engineer, hack, or compromise the App's security</li>
              <li>Not use the App in any way that violates applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p className="mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The App is provided "AS IS" without warranties of any kind, either express or implied</li>
              <li>We do not guarantee the accuracy, completeness, or usefulness of any information in the App</li>
              <li>We are not liable for any damages arising from your use or inability to use the App</li>
              <li>We are not responsible for any decisions you make based on information tracked in the App</li>
              <li>We are not liable for data loss, including if you clear your browser data or lose your device</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Backup</h2>
            <p>
              Since your personal data is stored locally on your device, you are responsible for backing up 
              your data. We recommend periodically exporting or screenshotting important information. We are 
              not responsible for data loss due to device failure, browser data clearing, or other technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue the App at any time without notice. 
              We may also update these Terms of Service periodically. Continued use of the App after changes 
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Age Requirement</h2>
            <p>
              The App is intended for users 18 years of age or older. If you are under 18, please use the 
              App only with parental or guardian supervision and consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Termination</h2>
            <p>
              You may stop using the App at any time. We reserve the right to terminate or restrict access 
              to the App for any reason, including violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of your 
              jurisdiction, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact</h2>
            <p>
              If you have questions about these Terms of Service, please contact us through the app's 
              About section.
            </p>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-600">
              By using Urge Tracker, you acknowledge that you have read, understood, and agree to be bound 
              by these Terms of Service.
            </p>
          </section>
        </div>
      </div>
  );
}
