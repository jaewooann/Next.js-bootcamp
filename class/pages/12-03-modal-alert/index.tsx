import { Modal } from 'antd';

const success = () => {
  Modal.success({
    content: '게시글 등록에 성공했습니다!!',
  });
};

const error = () => {
  Modal.error({
    content: '비밀번호가 틀렸습니다!!',
  });
};

const App = () => (
  <>
    <button onClick={success}>성공했을때!!</button>
    <button onClick={error}>실패했을때!!</button>
  </>
);

export default App;