export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()}. All rights reserved.</p>

      <p className="footer-note">Built with Next.js · μLearn LF 2026</p>
    </footer>
  );
}