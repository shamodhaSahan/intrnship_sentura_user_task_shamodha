import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function Userpage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [mobile, setMobile] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const authToken = "wys_aefS6r557WOSENwQ5FaxCYxVKmsEYb2YBov7";
        const response = await axios.get(
          "https://5dd09746c76f4f84a5f602ea93e28232.weavy.io/api/users",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response.data.data)
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      console.log(userId);

      const authToken = "wys_aefS6r557WOSENwQ5FaxCYxVKmsEYb2YBov7";
      await axios.delete(
        `https://5dd09746c76f4f84a5f602ea93e28232.weavy.io/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      alert("User deleted");
      loadAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSaveUser = async () => {
    try {
      const authToken = "wys_aefS6r557WOSENwQ5FaxCYxVKmsEYb2YBov7";

      const userId = uuidv4();

      const postData = {
        uid: userId,
        display_name: displayName,
        email: email,
        name: name,
        phone_number: mobile,
      };

      const response = await axios.post(
        "https://5dd09746c76f4f84a5f602ea93e28232.weavy.io/api/users",
        postData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      alert("user saved");
      loadAllUsers();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const loadAllUsers = async () => {
    console.log("start data fetching");
    try {
      const authToken = "wys_aefS6r557WOSENwQ5FaxCYxVKmsEYb2YBov7";

      const response = await axios.get(
        "https://5dd09746c76f4f84a5f602ea93e28232.weavy.io/api/users",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);

      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("end data fetching");
  };

  return (
    <div>
      <div>
        <form className="user_form">
          <input
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
          <button type="button" onClick={handleSaveUser}>
            Save
          </button>
        </form>
      </div>
      <div>
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Display Name</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.display_name}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.phone_number}</td>
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
