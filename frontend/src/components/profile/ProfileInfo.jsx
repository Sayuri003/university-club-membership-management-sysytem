function ProfileInfo() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

      <h2 className="text-3xl font-bold mb-8">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <p className="text-gray-500">Full Name</p>
          <h3 className="font-semibold text-lg">
            John Doe
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Faculty</p>
          <h3 className="font-semibold text-lg">
            Computing
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Department</p>
          <h3 className="font-semibold text-lg">
            Computer Science
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <h3 className="font-semibold text-lg">
            johndoe@university.edu
          </h3>
        </div>

      </div>

    </div>
  );
}

export default ProfileInfo;