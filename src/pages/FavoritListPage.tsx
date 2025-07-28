import React, {useEffect, useState} from 'react';
// import { useSelector } from 'react-redux'
// import { selectContactsData, selectFavorites } from 'src/store/contacts'
import { useGetContactsQuery } from 'src/store/contacts';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {ContactDto} from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';


export const FavoritListPage = () => {
  const [contacts, setContacts] = useState<ContactDto[] | undefined>([])
  const { data: contactsDataStore } = useGetContactsQuery();
  // список Избранных контактов всегда фиксированный
  const favoritesDataStore: FavoriteContactsDto = (!!contactsDataStore && contactsDataStore.length > 3) 
    ? [contactsDataStore[0].id, contactsDataStore[1].id, contactsDataStore[2].id, contactsDataStore[3].id]
    : [];
  // const contactsDataStore: ContactDto[] = useSelector(selectContactsData);
  // const favoritesDataStore: FavoriteContactsDto = useSelector(selectFavorites);

  
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
