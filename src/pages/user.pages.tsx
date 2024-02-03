import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function Userpage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [mobile, setMobile] = useState("");
  const [uId, setUId] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [userId, setUserId] = useState("");

  const [users, setUsers] = useState([]);

  const url = "https://5dd09746c76f4f84a5f602ea93e28232.weavy.io/api/users";
  const authToken = "wys_aefS6r557WOSENwQ5FaxCYxVKmsEYb2YBov7";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // not have end point
  const handleDeleteUser = async (userId: string) => {
    try {
      console.log(userId);

      await axios.delete(`${url}/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      loadAllUsers();
      alert("User deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSaveUser = async () => {
    try {
      const userId = uuidv4();

      const postData = {
        uid: userId,
        display_name: displayName,
        email: email,
        name: name,
        nickname: nickname,
        phone_number: mobile,
      };

      await axios.post(url, postData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      loadAllUsers();
      handleReset();
      alert("user saved");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const postData = {
        uid: uId,
        display_name: displayName,
        email: email,
        name: name,
        nickname: nickname,
        phone_number: mobile,
      };

      await axios.patch(`${url}/${userId}`, postData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      loadAllUsers();
      handleReset();
      alert("User updated");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEditUser = (user: any) => {
    console.log(user);
    setUserId(user.id ? user.id : "");
    setUId(user.uid ? user.uid : "");
    setDisplayName(user.display_name ? user.display_name : "");
    setEmail(user.email ? user.email : "");
    setName(user.name ? user.name : "");
    setNickname(user.nickname ? user.nickname : "");
    setMobile(user.phone_number ? user.phone_number : "");
    setIsUpdate(true);
  };

  const handleReset = () => {
    setDisplayName("");
    setEmail("");
    setName("");
    setNickname("");
    setMobile("");
    setIsUpdate(false);
  };

  const loadAllUsers = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="input_sexction">
        <form className="user_form">
          {isUpdate && <label>{userId}</label>}
          <input
            disabled={isUpdate}
            placeholder="display_name"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
          <input
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <input
            placeholder="phone_number"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          {isUpdate ? (
            <button type="button" onClick={handleUpdateUser}>
              Update
            </button>
          ) : (
            <button type="button" onClick={handleSaveUser}>
              Save
            </button>
          )}
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
      <div>
        <h2>All Users</h2>
        <table className="table">
          <thead className="heder_tr">
            <tr>
              <th>ID</th>
              <th>Display Name</th>
              <th>Email</th>
              {/* <th>Name</th> */}
              <th>Phone Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.display_name}</td>
                <td>{user.email}</td>
                {/* <td>{user.name}</td> */}
                <td>{user.phone_number}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Userpage;
