type SessionContext = {
  session?: {
    data: {
      name: string;
      role: {
        canManageContent: boolean;
        canManageUsers: boolean;
        canManageLeads: boolean;
      };
    };
    itemId: string;
    listKey: string;
  };
};
type ItemContext = { item: any } & SessionContext;

export const isSignedIn = ({ session }: SessionContext) => {
  return !!session;
};

export const permissions = {
  canManageContent: ({ session }: SessionContext) => {
    return !!session?.data.role?.canManageContent;
  },
  canManageUsers: ({ session }: SessionContext) => {
    return !!session?.data.role?.canManageUsers;
  },
  canManageLeads: ({ session }: SessionContext) => {
    return !!session?.data.role?.canManageLeads;
  }
};

export const rules = {
  canUseAdminUI: ({ session }: SessionContext) => {
    return !!session?.data.role;
  },
  canManageUser: ({ session, item }: ItemContext) => {
    if (permissions.canManageUsers({ session })) return true;
    if (session?.itemId === item.id) return true;
    return false;
  },
  canManageUserList: ({ session }: SessionContext) => {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageUsers({ session })) return true;
    return { where: { id: { equals: session?.itemId } } };
  },
  canManageLeads: ({ session }: SessionContext) => {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageLeads({ session })) return true;
    return { where: { id: { equals: session?.itemId } } };
  },
  canViewUserList: ({ session }: SessionContext) => {
    if (permissions.canManageUsers({ session }) || permissions.canManageLeads({ session })) return true;
    return false;
  },
  canManageUserEntity: ({ session }: SessionContext) => {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageUsers({ session })) return true;
    return {
      user: {
        id: {
          equals: session?.itemId
        }
      }
    };
  },
  canUserCreateEntity: ({ session }: SessionContext) => {
    if (!isSignedIn({ session })) return false;
    return true;
  },
  canUserUpdateCustomer: ({ session }: SessionContext) => {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageLeads({ session })) return true;
    return {
      id: {
        equals: session?.itemId
      }
    };
  }
};
