"use client";
import React from "react";

function CarCrashDetector({ isCrashed }) {
  const crashed = isCrashed;
  const isConnected = isCrashed == null ? false : true

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300  group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 13h2l1-2h13l1 2h1m-4 6h-6m6 0l1.5-6.5M9 19h6M9 19l-1.5-6.5"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Car Crash Detector
            </h3>
            <p className="text-gray-400 text-sm">Vehicle safety monitoring</p>
          </div>
        </div>

        {isConnected ? (
          <div
            className={`px-2 py-1 text-xs rounded-full ${
              crashed ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
            } font-medium`}
          >
            {crashed ? "ALERT" : "SAFE"}
          </div>
        ) : (
          <div className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 font-medium">
            DISCONNECTED
          </div>
        )}
      </div>

      {/* Body */}
      {!isConnected ? (
        <div className="flex items-center justify-center text-gray-400 text-sm rounded-lg">
          No data available
        </div>
      ) : (
        <>
          {/* Status */}
          <div className="text-center mb-6">
            <div
              className={`text-3xl font-bold mb-2 ${
                crashed ? "text-red-500" : "text-green-500"
              }`}
            >
              {crashed ? "CRASH DETECTED" : "CAR IS MOVING"}
            </div>
            <div className="text-sm text-gray-400">
              {crashed ? "Emergency situation" : "Normal operation"}
            </div>
          </div>

          {/* Visual */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className={`w-24 h-24 rounded-full border-4 ${
                  crashed ? "border-red-500" : "border-green-500"
                } flex items-center justify-center bg-gray-900`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    crashed ? "bg-red-500 animate-ping" : "bg-green-500"
                  }`}
                ></div>
              </div>

              {crashed && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <svg
                    className="w-16 h-16 animate-bounce text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 11h14v2H5zM7 15h10v2H7zM9 19h6v2H9z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Actions */}
          {crashed && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M5 20h14l-7-16-7 16z"
                  />
                </svg>
                <span className="font-medium">
                  Emergency services notified
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CarCrashDetector;
