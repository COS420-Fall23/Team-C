// React component
import React from 'react';

class serverAccess extends React.Component {
    createFile = (data) => {
        // Define the data you want to send
        const sData = {
            fileName: 'accounts.txt',
            fileContent: data
        };
        fetch('http://localhost:3001/createFile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify(sData), // Convert data to JSON string
        })
          .then((response) => response.text())
          .then((message) => console.log(message))
          .catch((error) => console.error('Error:', error));
    }

}

export default serverAccess;