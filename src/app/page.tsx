"use client"

import { Button } from "@/components/ui/button"

export default function Home() {
    const handleDownloadPDF = async () => {
        console.log('clicked!')
        try {
          // HTML string to be sent to the server
          const htmlString = '<html><body><h1>Hello, chibaaaaaaai!</h1></body></html>';
    
          const response = await fetch('http://localhost:5000/generate-pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
            // Convert HTML string to JSON and send it in the request body
            body: JSON.stringify({ html: htmlString }),
            // Add any additional options if needed
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch PDF');
          }
    
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
    
          const link = document.createElement('a');
          link.href = url;
          link.download = 'generated.pdf';
    
          document.body.appendChild(link);
          link.click();
    
          // Clean up
          URL.revokeObjectURL(url);
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading PDF:', error);
          // Handle error
        }
      };

    return (
        <div>
            <Button onClick={() => handleDownloadPDF()}>
                DOWNLOAD PDF BRO
            </Button>
        </div>
    )
}
