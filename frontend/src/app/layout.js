import './globals.css';
import Navbar from '../../components/Navbar';

export const metadata = {
  title: "Profitly",
  description: "Profit calculator dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container-balanced py-8">{children}</main>
      </body>
    </html>
  );
}