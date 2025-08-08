export default function AdminFooter() {
  return (
    <footer className="bg-white text-center py-2 border-top">
      <small>&copy; {new Date().getFullYear()} 
        <a className="ms-1" href="https://www.mplussoft.com" target="_blank">Mplussoft</a>
        . All rights reserved.</small>
    </footer>
  );
}
