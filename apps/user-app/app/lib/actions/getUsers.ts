"use server";

import db from "@repo/db/client";

const getUsersDetail = async (searchKey: string) => {
  try {
    const user = await db.user.findFirst({
      where: { number: searchKey },
      select: {
        id: true,
        name: true,
        number: true,
      },
    });
    return user;
  } catch (err) {
    return null;
  }
};

export default getUsersDetail;
