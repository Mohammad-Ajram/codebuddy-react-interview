import { useState, useEffect } from 'react';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then(res => res.json())
      .then(res => {
        setPosts(res.data.posts);
      });
  }, []);
  return (
    <Container className="pt-4">
      <h2>Posts</h2>
      <Row>
        {posts.map(post => (
          <Col xs="12" md="6" lg="4" key={post.id} className="p-2">
            <Card className="h-100">
              <CardBody>
                <div className="mb-2">
                  <span className="fw-bold">Id : </span>
                  {post.id}
                </div>
                <div className="mb-2">
                  <span className="fw-bold">First Name : </span>
                  {post.firstName}
                </div>
                <div className="mb-2">
                  <span className="fw-bold">Last Name : </span>
                  {post.lastName}
                </div>
                <div className="mb-2">
                  <span className="fw-bold">Writeup : </span>
                  {post.writeup}
                </div>
                <div className="mb-2">
                  <span className="fw-bold">Image : </span>
                  <img src={post.image} className="w-100" alt="post" />
                </div>
                <div className="mb-2">
                  <span className="fw-bold">Avatar : </span>
                  <img src={post.avatar} className="w-100" alt="Avatar" />
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;
