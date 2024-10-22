const Student = require('../models/Student');

// Get information
exports.getInfo = (req, res) => {
    res.json({
        data: {
            fullName: "Lê Nguyễn Phúc Anh",
            studentCode: "QE170043"
        }
    });
};

// POST Create a student
exports.createStudent = async (req, res) => {
    try {
      const { name, studentCode, isActive } = req.body;
      const newStudent = await Student.create({
        fullName: name, // Lưu 'name' thành 'fullName' trong MongoDB
        studentCode,
        isActive,
      });
  
      res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: {
          _id: newStudent._id,
          name: newStudent.fullName, // Đổi tên trường từ 'fullName' thành 'name'
          studentCode: newStudent.studentCode,
          isActive: newStudent.isActive,
        },
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Invalid student code format",
      });
    }
  };

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.find({});
      const formattedStudents = students.map((student) => ({
        _id: student._id,
        name: student.fullName, 
        studentCode: student.studentCode,
        isActive: student.isActive,
      }));
      res.status(200).json({
        success: true,
        data: formattedStudents, 
      });
    } catch {
      res.status(500).json({
        success: false,
        message: "Something went wrong on the server",
      });
    }
  };

// Get a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('fullName studentCode isActive');
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong on the server" });
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    try {
        // Tìm và cập nhật student theo id, trả về các thuộc tính cần thiết
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('fullName studentCode isActive');
        
        // Nếu không tìm thấy student
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        
        // Trả về kết quả thành công
        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        // Trả về lỗi nếu có vấn đề
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        // Tìm và xóa student theo ID
        const student = await Student.findByIdAndDelete(req.params.id);
        
        // Kiểm tra nếu không tìm thấy student
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Trả về kết quả thành công nếu đã xóa
        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        // Trả về lỗi nếu có vấn đề trong quá trình xử lý
        res.status(500).json({
            success: false,
            message: "Something went wrong on the server"
        });
    }
};