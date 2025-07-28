import React, {useEffect, useState, useMemo} from 'react';
import { useGetContactsQuery } from 'src/store/contacts';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {ContactDto} from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';


export const FavoritListPage = () => {
  const [contacts, setContacts] = useState<ContactDto[] | undefined>([])
  const { data: contactsDataStore } = useGetContactsQuery();
  // список Избранных контактов всегда фиксированный
  const favoritesDataStore: FavoriteContactsDto = useMemo(() => (!!contactsDataStore && contactsDataStore.length > 3) 
    ? [contactsDataStore[0].id, contactsDataStore[1].id, contactsDataStore[2].id, contactsDataStore[3].id]
    : [], 
  [contactsDataStore]);

  
  useEffect(() => {
    setContacts(() => contactsDataStore?.filter(({id}) => favoritesDataStore.includes(id)));
  }, [contactsDataStore, favoritesDataStore])
  return (
    <Row xxl={4} className="g-4">
      {contacts?.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
}
