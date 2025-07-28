import React, {FC, useEffect, useState} from 'react';
// import { useSelector } from 'react-redux'
// import { selectContactsData } from 'src/store/contacts'
import { useGetContactsQuery } from 'src/store/contacts';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactDto} from 'src/types/dto/ContactDto';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';


export const ContactPage: FC = () => {
  const { data: contactsDataStore } = useGetContactsQuery();
  // const contactsDataStore: ContactDto[] = useSelector(selectContactsData);

  const {contactId} = useParams<{ contactId: string }>();
  const [contact, setContact] = useState<ContactDto>();

  useEffect(() => {
    setContact(() => contactsDataStore?.find(({id}) => id === contactId));
  }, [contactId, contactsDataStore]);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
