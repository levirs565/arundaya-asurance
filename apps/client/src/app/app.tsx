import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@client/components/ui/card';
import NxWelcome from './nx-welcome';

export function App() {
  return (
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
  );
}

export default App;
