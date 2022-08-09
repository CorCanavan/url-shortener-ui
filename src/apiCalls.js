export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const addUrl = (newURL) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    body: JSON.stringify(newURL),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
}
