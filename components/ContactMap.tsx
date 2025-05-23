export default function ContactMap() {
  return (
    <div className="h-[80%] w-full bg-white rounded-2xl  p-4 relative">
      {/* Map */}
      <div className="h-full w-full overflow-hidden rounded-xl">
        <iframe
          src="https://maps.google.com/maps?q=New York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 rounded-xl"
          loading="lazy"
          allowFullScreen
        />
      </div>

      {/* Floating Card */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[79%] h-[30%] bg-white text-black rounded-xl shadow-md p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-6">
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-1">Address</h3>
            <p>237 Market Square, Accra, Ghana</p>
          </div>
          <div className="md:w-1/2 mt-4 px-5 md:mt-0">
            <h3 className="text-lg font-semibold mb-1">Email</h3>
            <p className="text-blue-600">qrgen@support.com</p>
            <div>
              <h3 className="text-lg  font-semibold mb-1 mt-3">Phone</h3>
              <p className="text-blue-600">+123 456 7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
