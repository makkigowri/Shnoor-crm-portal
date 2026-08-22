const EMPLOYEE_ROLES = ["SALES_MANAGER", "SALES_EXECUTIVE", "SUPPORT_AGENT"];
const ROLE_CATEGORY = {
  ORG_ADMIN: "ORG_ADMIN",
  SALES_MANAGER: "EMPLOYEE",
  SALES_EXECUTIVE: "EMPLOYEE",
  SUPPORT_AGENT: "EMPLOYEE",
};
const getRoleCategory = (role) => ROLE_CATEGORY[role] || null;
const isEmployeeRole = (role) => EMPLOYEE_ROLES.includes(role);
const authorizeRoles = (...allowedCategories) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    const category = getRoleCategory(req.user.role);
    if (!category || !allowedCategories.includes(category)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }
    next();
  };
};
const requireOrgAdmin = authorizeRoles("ORG_ADMIN");
const requireEmployee = authorizeRoles("EMPLOYEE");
const requireAnyRole = authorizeRoles("ORG_ADMIN", "EMPLOYEE");
module.exports = {
  EMPLOYEE_ROLES,
  getRoleCategory,
  isEmployeeRole,
  authorizeRoles,
  requireOrgAdmin,
  requireEmployee,
  requireAnyRole,
};
