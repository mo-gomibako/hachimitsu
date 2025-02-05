import { eq } from "drizzle-orm";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  FC,
  useEffect,
  useState,
} from "react";

import { db } from "@/db";
import { users_ } from "@/db/schema";

type Data =
  | {
      user: {
        id: number;
        name: string;
      };
    }
  | "loading"
  | "nologin";

const SessionContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  data: Data;
}>({
  signIn: () => null,
  signOut: () => null,
  data: "loading",
});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<Data>("loading");

  useEffect(() => {
    const initData = async () => {
      const users = await db.select().from(users_).where(eq(users_.id, 0));
      setData(users[0] ? { user: users[0] } : "nologin");
    };
    initData();
  }, []);

  const signIn = async () => {
    const users = await db
      .insert(users_)
      .values({
        id: 0,
        name: "momoogles",
      })
      .returning();
    setData(users[0] ? { user: users[0] } : "nologin");
  };

  return (
    <SessionContext.Provider
      value={{
        signIn,
        signOut: () => {
          /** */
        },
        data,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
