import react, { useState, useEffect } from 'react';
import AdminNav from '../../AdminNav'
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
const apiUrl = 'http://127.0.0.1:8000/api/publisher'
function Publisher() {

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const [actionType, setActionType] = useState('add'); // add, edit
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (actionType === 'add') {
                await axios.post(`${apiUrl}`, { name });
            } else if (actionType === 'edit') {
                await axios.put(`${apiUrl}/${selectedId}`, { name });
            }

            setName('');
            toggleModal();
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditClick = (id) => {
        const student = data.find((item) => item.id === id);
        if (student) {
            setSelectedId(student.id);
            setName(student.name);
            setActionType('edit');
            setModal(true);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const toggleModal = () => {
        setModal(!modal);

        setSelectedId(null);
        setName('');
    };

  return (
    <div>
        <AdminNav/>
        
        <Container>
                <Row>
                    <Col>
                        <h1>Publisher List</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="primary" onClick={toggleModal}>Add Publisher</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                <th>STT</th>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((student, index) => (
                                    <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>
                                            <Button color="primary" onClick={() => handleEditClick(student.id)}>Edit</Button>{' '}
                                            <Button color="danger" onClick={() => handleDeleteClick(student.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>{actionType === 'add' ? 'Add NXB' : 'Edit NXB'}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </FormGroup>
                            <Button type="submit" color="primary">{actionType === 'add' ? 'Add' : 'Save'}</Button>{' '}
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {actionType === 'edit' && (
                            <Button color="danger" onClick={() => handleDeleteClick(selectedId)}>Delete</Button>
                        )}
                    </ModalFooter>
                </Modal>
            </Container>
        
        </div>
  )
}

export default Publisher