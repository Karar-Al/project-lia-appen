import Card from '../../../components/card/card';
import applications from './mock-data';
import { useEffect, useState } from 'react';
import Modal from './modal';
import './applications-container.scss';

const ApplicationsContainer = () => {
  /*   const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (i) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe)
      console.log('swipe', isLeftSwipe ? 'left' : 'right');
  }; */

  const [applicantList, setApplicantList] = useState([...applications]);
  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  const myBadges = ['HTML', 'CSS', 'JS', 'NODE', 'REACT'];

  applicantList.sort((a, b) => b.badges.length - a.badges.length);

  function removeApplication(i) {
    setApplicantList(applicantList.filter((re, r) => r !== i));
  }
  function removeLeft(i) {
    document
      .getElementById('application-card-' + i)
      .classList.add('animate-left');
    setTimeout(() => {
      removeApplication(i);
      document
        .getElementById('application-card-' + i)
        .classList.remove('animate-left');
    }, 500);
  }

  function removeRight(i) {
    document
      .getElementById('application-card-' + i)
      .classList.add('animate-right');
    setTimeout(() => {
      removeApplication(i);
      document
        .getElementById('application-card-' + i)
        .classList.remove('animate-right');
    }, 500);
  }

  function gotoModal(i) {
    setCurrentIndex(i);
    setOpenModal(true);
  }

  return (
    <div className="applications-container">
      <div className="applications-container-top">
        <div>
          <h1>Applications - {applicantList.length}/10</h1>
        </div>
      </div>
      {applicantList.map((a, i) => {
        return (
          <div key={a + i}>
            <Card
              id={'application-card-' + i}
              title={a.title}
              startTime={a.startTime}
              endTime={a.endTime}
              workModel={a.workModel}
              location={a.location}
              companyBadges={myBadges}
              applicantBadges={a.badges}
              readMoreButtonOnClick={() => gotoModal(i)}
              denyButtonOnClick={() => removeLeft(i)}
              acceptButtonOnClick={() => removeRight(i)}
            />
          </div>
        );
      })}
      {openModal && (
        <Modal
          applicantList={applicantList}
          setApplicantList={setApplicantList}
          companyBadges={myBadges}
          index={currentIndex}
          setOpenModal={setOpenModal}
          removeApplication={() => removeApplication(currentIndex)}
        />
      )}
    </div>
  );
};

export default ApplicationsContainer;
