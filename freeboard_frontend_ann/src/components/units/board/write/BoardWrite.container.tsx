import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import type { IBoardWriteProps, IMyVariales } from "./BoardWrite.types";
import type { IMutation, IMutationCreateBoardArgs, IMutationUpdateBoardArgs } from "../../../../commons/types/generated/types";
import type { Address } from "react-daum-postcode/lib/loadPostcode";

export default function BoardWrite(props: IBoardWriteProps) {
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [zipcode, setzipcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [etcAddress, setEtcAddress] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [fileUrls, setFileUrls] = useState(['', '', '']);

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [createBoard] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(CREATE_BOARD);
  const [updateBoard] = useMutation<Pick<IMutation, "updateBoard">, IMutationUpdateBoardArgs>(UPDATE_BOARD);

  const router = useRouter();

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if(event.target.value !== ""){
      setWriterError("")
    }
    if(event.target.value && password && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if(event.target.value !== ""){
      setPasswordError("")
    }
    if(writer && event.target.value && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if(event.target.value !== ""){
      setTitleError("")
    }
    if(writer && password && event.target.value && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    if(event.target.value !== ""){
      setContentsError("")
    }
    if(writer && password && title && event.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onToggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const onChangeEtcAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setEtcAddress(e.target.value);
  }
  
  const handleComplete = (address: Address) => {
    console.log(address);
    setRoadAddress(address.roadAddress);
    setzipcode(address.zonecode);
    onToggleModal();
  }

  const onChangeYoutubeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  }

  const onChangeFileUrls = (fileUrl: string, idx: number) => {
    const newFileUrls = [...fileUrls];
    newFileUrls[idx] = fileUrl;
    setFileUrls(newFileUrls);
  }
  
  useEffect(() => {
    if(props.data?.fetchBoard.images?.length) {
      setFileUrls([...props.data.fetchBoard.images]);
    }
  }, [props.data])
  

  const onClickSubmit = async () => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (!title) {
      setTitleError("제목을 입력해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }
    if (writer && password && title && contents) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents,
              youtubeUrl,
              boardAddress: {
                zipcode,
                address: roadAddress,
                addressDetail: etcAddress
              },
              images: fileUrls
            }
          }
        });
        if(typeof result.data?.createBoard?._id !== 'string') {
          alert('일시적인 오류가 있습니다. 다시 시도해 주세요.');
          return;
        }
        alert('게시글 등록이 완료되었습니다.');
        void router.push(`/boards/${result.data?.createBoard?._id}`);
      } catch(error: any) {
        alert(error.message);
      }
    }
  };

  const onClickUpdate = async () => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    if(!title && !contents && !roadAddress && !zipcode && !etcAddress && !youtubeUrl && !isChangedFiles) {
      alert('수정한 내용이 없습니다.');
      return;
    }
    if(!password) {
      alert('비밀번호를 입력해주세요');
      return;
    }

    const myVariables: IMyVariales = {};
    if (title) myVariables.title = title;
    if (contents) myVariables.contents = contents;
    if (youtubeUrl) myVariables.youtubeUrl = youtubeUrl;
    if (zipcode || roadAddress || etcAddress) {
      myVariables.boardAddress =  {}
      if (zipcode) myVariables.boardAddress.zipcode = zipcode;
      if (roadAddress) myVariables.boardAddress.address = roadAddress;
      if (etcAddress) myVariables.boardAddress.addressDetail = etcAddress;
    }
    if (isChangedFiles) myVariables.images = fileUrls;
    
    // if (zipcode) myVariables.zipcode = zipcode;
    // if (roadAddress) myVariables.address = roadAddress;
    // if (etcAddress) myVariables.addressDetail = etcAddress;

    try {
      if(typeof router.query.boardId !== 'string') return;
      const result = await updateBoard({
        variables: {
          updateBoardInput: myVariables,
          password,
          boardId: router.query.boardId,
        }
      });
      if(typeof result.data?.updateBoard?._id !== 'string') {
        alert('일시적인 오류가 있습니다. 다시 시도해 주세요.');
        return;
      }
      alert('게시글 수정이 완료되었습니다.');
      router.push(`/boards/${result.data?.updateBoard?._id}`);
    } catch(error) {
      if(error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <BoardWriteUI 
      isEdit={props.isEdit}
      data={props.data}
      fileUrls={fileUrls}
      isModalOpen={isModalOpen}
      zipcode={zipcode}
      roadAddress={roadAddress}
      etcAddress={etcAddress}
      onToggleModal={onToggleModal}
      onChangeEtcAddress={onChangeEtcAddress}
      handleComplete={handleComplete}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onChangeYoutubeUrl={onChangeYoutubeUrl}
      onChangeFileUrls={onChangeFileUrls}
      writerError={writerError}
      passwordError={passwordError}
      titleError={titleError}
      contentsError={contentsError}
      isActive={isActive}
    />
  );
}