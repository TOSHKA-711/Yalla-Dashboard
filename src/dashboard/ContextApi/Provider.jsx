import React, { createContext, useState, useEffect } from "react";

// Create the context
export const MyContext = createContext();

const MyProvider = ({ children }) => {
  // Initialize state from local storage or set to default
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [selectedUsers, setSelectedUsers] = useState(() => {
    const savedSelectedUsers = localStorage.getItem("selectedUsers");
    return savedSelectedUsers ? JSON.parse(savedSelectedUsers) : {};
  });

  const [selectedPlayer, setSelectedPlayer] = useState(() => {
    const savedSelectedPlayer = localStorage.getItem("selectedPlayer");
    return savedSelectedPlayer ? JSON.parse(savedSelectedPlayer) : {};
  });

  const [selectedBook, setSelectedBook] = useState(() => {
    const savedSelectedBook = localStorage.getItem("selectedBook");
    return savedSelectedBook ? JSON.parse(savedSelectedBook) : {};
  });

  const [selectedAd, setSelectedAd] = useState(() => {
    const savedSelectedAd = localStorage.getItem("selectedAd");
    return savedSelectedAd ? JSON.parse(savedSelectedAd) : {};
  });

  const [selectedFacility, setSelectedFacility] = useState(() => {
    const savedSelectedFacility = localStorage.getItem("selectedFacility");
    return savedSelectedFacility ? JSON.parse(savedSelectedFacility) : {};
  });

  // const [DialogPaymentData, setDialogPaymentData] = useState(() => {
  //   const savedDialogPaymentData = localStorage.getItem("DialogPaymentData");
  //   return savedDialogPaymentData ? JSON.parse(savedDialogPaymentData) : {};
  // });

  // Update local storage whenever users or selectedUsers change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("selectedUsers", JSON.stringify(selectedUsers));
  }, [selectedUsers]);

  useEffect(() => {
    localStorage.setItem("selectedPlayer", JSON.stringify(selectedPlayer));
  }, [selectedPlayer]);

  useEffect(() => {
    localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
  }, [selectedBook]);

  useEffect(() => {
    localStorage.setItem("selectedAd", JSON.stringify(selectedAd));
  }, [selectedAd]);

  useEffect(() => {
    localStorage.setItem("selectedFacility", JSON.stringify(selectedFacility));
  }, [selectedFacility]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "DialogPaymentData",
  //     JSON.stringify(DialogPaymentData)
  //   );
  // }, [DialogPaymentData]);

  return (
    <MyContext.Provider
      value={{
        users,
        setUsers,
        selectedUsers,
        setSelectedUsers,
        selectedBook,
        setSelectedBook,
        selectedPlayer,
        setSelectedPlayer,
        selectedAd,
        setSelectedAd,
        selectedFacility,
        setSelectedFacility,
        // DialogPaymentData,
        // setDialogPaymentData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
