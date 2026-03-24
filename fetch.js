import https from 'https';
import fs from 'fs';

https.get('https://api.ods.od.nih.gov/dsld/v8/label/19121?api_key=mr4CHTNiuE9duVbouK0zOsbHrgNLffys7ApcCYec', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('label.json', data);
    console.log('Saved to label.json');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
