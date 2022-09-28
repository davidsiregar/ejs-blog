const deleteBlog = btn => {
    const blogId = btn.parentNode.querySelector('[name=blogId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
  
    const productElement = btn.closest('section');
  
    fetch('/blog/blog/' + blogId, {
      method: 'DELETE',
      headers: {
        'csrf-token': csrf
      }
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        console.log(data);
        productElement.parentNode.removeChild(productElement);
      })
      .catch(err => {
        console.log(err);
      });
  };
  