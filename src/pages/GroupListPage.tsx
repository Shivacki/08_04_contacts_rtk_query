import { useGetGroupsQuery } from 'src/store/groups';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
// import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';


export const GroupListPage = () => {
  
  // Получаем данные с пом. rtk query (без использования обычных redux-селекторов), включая встроенные флаги загрузки данных и значения ошибок, переименовывая необх. поля при деструктуризации
  const { data: groupsDataStore, isLoading, error } = useGetGroupsQuery();


  if (isLoading)
    return <>Загрузка групп...</>
  if (!!error)
    return <>Ошибка при загрузке групп</>

  return (
    <Row xxl={4}>
      {groupsDataStore?.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
}
