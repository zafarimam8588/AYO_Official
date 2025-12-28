import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";

interface AdminContextValue {
  isAdmin: boolean;
  isViewer: boolean;
  showOverlays: boolean;
  toggleOverlays: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [showOverlays, setShowOverlays] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isViewer, setIsViewer] = useState(false);

  // Check admin/viewer status from localStorage
  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          setIsAdmin(user?.role === "admin");
          setIsViewer(user?.role === "viewer");
        } else {
          setIsAdmin(false);
          setIsViewer(false);
        }
      } catch {
        setIsAdmin(false);
        setIsViewer(false);
      }
    };

    // Initial check
    checkAdminStatus();

    // Listen for storage changes (login/logout)
    window.addEventListener("storage", checkAdminStatus);

    // Also check on focus (in case localStorage changed in another tab)
    window.addEventListener("focus", checkAdminStatus);

    return () => {
      window.removeEventListener("storage", checkAdminStatus);
      window.removeEventListener("focus", checkAdminStatus);
    };
  }, []);

  const value = useMemo(
    () => ({
      isAdmin,
      isViewer,
      showOverlays: (isAdmin || isViewer) && showOverlays,
      toggleOverlays: () => setShowOverlays((prev) => !prev),
    }),
    [isAdmin, isViewer, showOverlays]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within AdminProvider");
  }
  return context;
}

// Hook to check if current user is admin without throwing
function useIsAdmin(): boolean {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user?.role === "admin";
    }
  } catch {
    // Ignore errors
  }
  return false;
}

// Hook to check if current user is viewer (read-only admin)
function useIsViewer(): boolean {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user?.role === "viewer";
    }
  } catch {
    // Ignore errors
  }
  return false;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAdminContext, useIsAdmin, useIsViewer };
