const BASE_URL = "http://192.168.0.239:2000/api";

const api = {
  admin: {
    login: `${BASE_URL}/admin-login`,
    add_project: `${BASE_URL}/admin/project-store`,
    get_projects: `${BASE_URL}/admin/project-table`,
    update_project: `${BASE_URL}/admin/project-update`,
    edit_project: `${BASE_URL}/project`,
  },
  front: {
    get_dashboard: `${BASE_URL}/dashboard`,
    lost_making_projects: `${BASE_URL}/lost-dashboard`,
  },
};

export default api;
