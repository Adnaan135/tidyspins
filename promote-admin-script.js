// Temporary script to promote user to admin
// This demonstrates the API call

const email = "adnaanabdulkarim135@gmail.com";

// Call the promote-to-admin function
fetch('https://yplyhblbttuwalgzxsow.supabase.co/functions/v1/promote-to-admin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwbHloYmxidHR1d2FsZ3p4c293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTkxOTIsImV4cCI6MjA1Nzg3NTE5Mn0.Ua71jZ7hj3BoYtX76w2ZhpICHwXw4Yy8IuoNYUyrCRc'
  },
  body: JSON.stringify({ email })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));