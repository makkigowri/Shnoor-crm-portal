const leadService = require("../services/leadService");
const getLeads = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const leads = await leadService.getLeads(organizationId, userId);
    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
    });
  } catch (error) {
    console.error("Get leads error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to load leads",
    });
  }
};
const getLead = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const lead = await leadService.getLeadById(req.params.id, organizationId, userId);
    res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Get lead error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to load lead",
    });
  }
};
const createLead = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const lead = await leadService.createLead(organizationId, userId, req.body);
    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Create lead error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to create lead",
    });
  }
};
const updateLead = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const lead = await leadService.updateLead(req.params.id, organizationId, userId, req.body);
    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Update lead error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to update lead",
    });
  }
};
const deleteLead = async (req, res) => {
  try {
    const { userId, organizationId } = req.user;
    const result = await leadService.deleteLead(req.params.id, organizationId, userId);
    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Delete lead error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to delete lead",
    });
  }
};
module.exports = {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
};
